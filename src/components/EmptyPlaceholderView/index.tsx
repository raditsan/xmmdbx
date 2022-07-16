import React from 'react';
import {Label, View} from 'src/components';
import {useTranslation} from 'react-i18next';
import {EmptyPlaceholderViewProps} from 'src/types';

const MessageBody = ({title, message}) => {
  return (
    <>
      {title ? (
        <Label textAlign={'center'} size={12} fontWeight={'500'}>
          {title}
        </Label>
      ) : null}
      {message ? (
        <Label textAlign={'center'} size={12} fontWeight={'400'}>
          {message}
        </Label>
      ) : null}
    </>
  );
};

export function EmptyPlaceholderView(props: EmptyPlaceholderViewProps) {
  const {title, message, generalMessage, paddingHorizontal = 70} = props;
  const {t} = useTranslation();
  return (
    <View flex={1} justifyContent={'center'} {...props}>
      <View paddingHorizontal={paddingHorizontal}>
        {!!generalMessage ? (
          <MessageBody
            title={t('empty_title', {value: generalMessage})}
            message={t('empty_message', {value: generalMessage})}
          />
        ) : (
          <MessageBody title={title} message={message} />
        )}
      </View>
    </View>
  );
}
