import {Colors} from 'src/components';
import {
  ColorSchemeName,
  ColorValue,
  FlatListProps,
  GestureResponderEvent,
  LayoutChangeEvent,
  OpaqueColorValue,
  ScrollViewProps,
  StatusBarStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {AxiosResponse} from 'axios';
import {ApiGetProps} from 'src/apis';

type Modify<T, R> = Omit<T, keyof R> & R;

export interface FetchProps<P> {
  // apiFunction: (email: string, password: string) => Promise<AxiosResponse<any>>
  apiFunction: (data: any) => Promise<P>;
  fetchOnMounted?: boolean;
  listValueAndLabel?: {
    valueKey: string;
    labelKey1?: string;
    labelKey2?: string;
    custom?: (value: P, index: number, obj: P[]) => void;
  };
  showToastWhenSuccess?: boolean;
  showToastWhenFailed?: boolean;
  initialParamOrDataForFetch?: any;
  saveDataWithName?: string;
  offlineIdentifier?: string;
}
export type ColorName = keyof typeof Colors;

export interface ViewProps
  extends Modify<
    ViewStyle,
    {
      backgroundColor?:
        | ColorName
        | ColorSchemeName
        | ColorValue
        | string
        | undefined;
      borderColor?: ColorName | ColorSchemeName;
    }
  > {
  children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
  headerButtonRight?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle> | undefined;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}

export interface LabelProps
  extends Modify<
    TextStyle,
    {
      backgroundColor?:
        | ColorName
        | ColorSchemeName
        | ColorValue
        | OpaqueColorValue
        | string
        | undefined;
    }
  > {
  numberOfLines?: number | undefined;
  lineBreakMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  children: string | React.ReactNode;
  style?: StyleProp<TextStyle> | undefined;
  size?: number;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: ColorName | ColorValue | string | undefined;
}

export type LayoutProps = {
  style?: StyleProp<ViewStyle> | undefined;
  showShadowHeader?: boolean | undefined;
  safeAreaTopStatusbar?: boolean | undefined;
  safeAreaBottom?: boolean | undefined;
  safeAreaTopHeaderAndStatusbar?: boolean | undefined;
  children: React.ReactNode | Element | Element[];
  headerProps?: HeaderProps;
  layoutStyle?: 'linearLayout1' | 'linearLayout2';
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  showHeader?: boolean;
  backgroundColor?:
    | ColorName
    | ColorSchemeName
    | ColorValue
    | string
    | undefined;
};

export interface HeaderProps {
  title?: string;
  hideBackButton?: boolean;
  headerButtonRight?: React.ReactNode | React.ReactNode[] | Element | Element[];
  headerButtonLeft?: React.ReactNode | React.ReactNode[] | Element | Element[];
  showDivider?: boolean;
  style?: ViewStyle;
  tintColor?: ColorName;
  barStyle?: StatusBarStyle;
}

export type FlatListFooterIndicatorProps = {
  active?: boolean;
  color?: ColorName | string;
};

export interface EmptyPlaceholderViewProps extends ViewProps {
  title?: string;
  message?: string;
  generalMessage?: string;
  paddingHorizontal?: number;
}

export interface PageProps {
  navigation?: any;
  route?: any;
}

// @ts-ignore
export interface FlatListServerSideProps<ItemT> extends FlatListProps<ItemT> {
  data?: [];
  name?: string;
  emptyPlaceholderViewProps?: EmptyPlaceholderViewProps;
  fetchOnMount?: boolean;
  dataRequest?: ApiGetProps;
  onFetching?: (value: boolean) => void;
  forceLocalSide?: boolean;
  uniqueKey: string;
  refreshAble?: boolean;
  noPagination?: boolean;
  flagRefresh?: string;
  onResponse?: (response: AxiosResponse) => void;
  apiFunction?: (data: any) => Promise<any>;
}

export interface MovieModel {
  known_for: any;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  profile_path: string;
  release_date: string;
  title: string;
  name: string;
  o: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface HookScrollViewProps {
  onRefresh?: () => void;
  scrollViewProps?: ScrollViewProps;
}

export interface PersonModel {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface KnownFor {
  backdrop_path: string;
  first_air_date: Date;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
