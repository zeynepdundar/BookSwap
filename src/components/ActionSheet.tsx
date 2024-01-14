import { Actionsheet as BaseActionsheet } from 'native-base';
import i18n from "../i18n";

export const ActionSheet = ({ isOpen, onClose, actions }) => {

  return (
    <BaseActionsheet isOpen={isOpen} onClose={onClose}>
      <BaseActionsheet.Content>
        {actions.map((action, index) => (
          <BaseActionsheet.Item  key={`${action.type}:${index}`}  onPress={action.onPress}>
            {i18n.t(action.label)}
          </BaseActionsheet.Item>
        ))}
      </BaseActionsheet.Content>
    </BaseActionsheet>
  );
};
