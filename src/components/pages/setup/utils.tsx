import { merge } from 'lodash';
import { IconComponentProps } from '@/import/icon';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import IdCardOutlined from '@ant-design/icons/IdcardOutlined';
import { SETUP, DATA_SOURCES } from '@/utils/enum';
import Starter from './Starter';
import ConnectDataSource from './ConnectDataSource';
import SelectModels from './SelectModels';
import DefineRelations from './DefineRelations';
import { SampleDatasetName } from '@/apollo/client/graphql/__types__';
import { ERROR_CODES } from '@/utils/errorHandler';
import {
  getDataSourceConfig,
  getDataSourceFormComponent,
} from '@/utils/dataSourceType';

type SetupStep = {
  step: number;
  component: (
    props?: React.ComponentProps<typeof Starter> &
      React.ComponentProps<typeof ConnectDataSource> &
      React.ComponentProps<typeof SelectModels> &
      React.ComponentProps<typeof DefineRelations>,
  ) => JSX.Element;
  maxWidth?: number;
};

export type ButtonOption = {
  label: string;
  logo?: string;
  IconComponent?: IconComponentProps['component'];
  guide?: string;
  disabled?: boolean;
  submitting?: boolean;
  value?: string;
};

export const SETUP_STEPS = {
  [SETUP.STARTER]: {
    step: 0,
    component: Starter,
  },
  [SETUP.CREATE_DATA_SOURCE]: {
    step: 0,
    component: ConnectDataSource,
    maxWidth: 960,
  },
  [SETUP.SELECT_MODELS]: {
    step: 1,
    component: SelectModels,
    maxWidth: 960,
  },
  [SETUP.DEFINE_RELATIONS]: {
    step: 2,
    component: DefineRelations,
  },
} as { [key: string]: SetupStep };

export const DATA_SOURCE_OPTIONS = {
  [DATA_SOURCES.MYSQL]: {
    ...getDataSourceConfig(DATA_SOURCES.MYSQL),
    guide: '',
    disabled: false,
  },
  [DATA_SOURCES.POSTGRES]: {
    ...getDataSourceConfig(DATA_SOURCES.POSTGRES),
    guide: '',
    disabled: false,
  },
  [DATA_SOURCES.BIG_QUERY]: {
    ...getDataSourceConfig(DATA_SOURCES.BIG_QUERY),
    guide: '',
    disabled: true,
  },

} as { [key: string]: ButtonOption };

export const TEMPLATE_OPTIONS = {
};

export const getDataSources = () => {
  return Object.values(DATA_SOURCE_OPTIONS) as ButtonOption[];
};

export const getDataSource = (dataSource: DATA_SOURCES) => {
  return merge(
    DATA_SOURCE_OPTIONS[dataSource],
    getDataSourceFormComponent(dataSource),
  );
};

export const getTemplates = () => {
  return Object.keys(TEMPLATE_OPTIONS).map((key) => ({
    ...TEMPLATE_OPTIONS[key],
    value: key,
  })) as ButtonOption[];
};

export const getPostgresErrorMessage = (error: Record<string, any>) => {
  if (error.code === ERROR_CODES.CONNECTION_REFUSED) {
    return (
      <div>
        {error.message}. <br />
        If you are having trouble connecting to your PostgreSQL database, please
        refer to our{' '}
        <a
          href="https://docs.getwren.ai/oss/guide/connect/postgresql#connect"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </a>{' '}
        for detailed instructions.
      </div>
    );
  }
  return error.message;
};
