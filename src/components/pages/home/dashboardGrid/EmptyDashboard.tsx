import Link from 'next/link';
import Image from 'next/image';
import { Row, Col } from 'antd';
import { Logo } from '@/components/Logo';
import { makeIterable } from '@/utils/iteration';

const StepTemplate = (props: { title: string; image: string }) => {
  return (
    <Col>
      <div
        className="p-3 rounded bg-gray-1 border border-gray-5"
        style={{ boxShadow: '2px 2px 2px 0px #00000006' }}
      >
        <div className="mb-2">
          <span
            className="d-inline-block bg-geekblue-1 geekblue-6 rounded-pill text-sm px-2"
            style={{ lineHeight: '22px' }}
          >
            {props.title}
          </span>
        </div>
        <Image
          className="rounded border border-gray-4"
          src={props.image}
          width={160}
          height={80}
          alt={props.title}
        />
      </div>
    </Col>
  );
};

const StepIterator = makeIterable(StepTemplate);

const EmptyDashboard = (props: {
  show: boolean;
  children: React.ReactNode;
}) => {
  const { show, children } = props;
  if (show) {
    return (
      <div
        className="d-flex align-center justify-center flex-column -mt-8"
        style={{ height: '100%' }}
      >
        <Logo size={48} color="var(--gray-8)" />
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <h4 className="text tracking-tight">Your customised summary</h4>
        </div>
      </div>
        <div className="text-lg text-medium text-center gray-8 mt-3">
          COMING SOON
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default EmptyDashboard;
