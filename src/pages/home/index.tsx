import { ComponentRef, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography } from 'antd';
import { Logo } from '@/components/Logo';
import { Path } from '@/utils/enum';
import SiderLayout from '@/components/layouts/SiderLayout';
import Prompt from '@/components/pages/home/prompt';
import DemoPrompt from '@/components/pages/home/prompt/DemoPrompt';
import useHomeSidebar from '@/hooks/useHomeSidebar';
import useAskPrompt from '@/hooks/useAskPrompt';
import useRecommendedQuestionsInstruction from '@/hooks/useRecommendedQuestionsInstruction';
import RecommendedQuestionsPrompt from '@/components/pages/home/prompt/RecommendedQuestionsPrompt';
import {
  useSuggestedQuestionsQuery,
  useCreateThreadMutation,
  useThreadLazyQuery,
} from '@/apollo/client/graphql/home.generated';
import { useGetSettingsQuery } from '@/apollo/client/graphql/settings.generated';
import { CreateThreadInput } from '@/apollo/client/graphql/__types__';

const { Text } = Typography;

const Wrapper = ({ children }) => {
  return (
    <div
      className="d-flex align-center justify-center flex-column"
      style={{ height: '100%' }}
    >
      <Logo size={48} color="var(--gray-8)" />
      <div className="text-md text-medium gray-8 mt-3">
        Access predefined insights and generate custom AI insights for your loan portfolio.
      </div>
      {children}
    </div>
  );
};

const SampleQuestionsInstruction = (props) => {
  const { sampleQuestions, onSelect } = props;

  return (
    <Wrapper>
      <DemoPrompt demo={sampleQuestions} onSelect={onSelect} />
    </Wrapper>
  );
};

export default function Home() {
  const $prompt = useRef<ComponentRef<typeof Prompt>>(null);
  const router = useRouter();
  const homeSidebar = useHomeSidebar();
  const askPrompt = useAskPrompt();

  const { data: suggestedQuestionsData } = useSuggestedQuestionsQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [createThread, { loading: threadCreating }] = useCreateThreadMutation({
    onCompleted: () => homeSidebar.refetch(),
  });
  const [preloadThread] = useThreadLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: settingsResult } = useGetSettingsQuery();
  const settings = settingsResult?.settings;
  const isSampleDataset = useMemo(
    () => Boolean(settings?.dataSource?.sampleDataset),
    [settings],
  );

  const sampleQuestions = useMemo(
    () => suggestedQuestionsData?.suggestedQuestions.questions || [],
    [suggestedQuestionsData],
  );

  const onSelectQuestion = async ({ question }) => {
    $prompt.current.submit(question);
  };

  const onCreateResponse = async (payload: CreateThreadInput) => {
    try {
      askPrompt.onStopPolling();
      const response = await createThread({ variables: { data: payload } });
      const threadId = response.data.createThread.id;
      await preloadThread({ variables: { threadId } });
      router.push(Path.Home + `/${threadId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SiderLayout loading={false} sidebar={homeSidebar}>
      {isSampleDataset && (
        <SampleQuestionsInstruction
          sampleQuestions={sampleQuestions}
          onSelect={onSelectQuestion}
        />
      )}
      <Prompt
        ref={$prompt}
        {...askPrompt}
        onCreateResponse={onCreateResponse}
      />
    </SiderLayout>
  );
}
