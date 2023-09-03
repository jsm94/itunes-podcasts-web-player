import { SelectChangeEventType, SelectValue } from "@mui/base";
import {
  OrderByActionTypes,
  Orders,
  useOrderByDispatch,
} from "../context/OrderByContext";

import { Icon, IconSizes, Icons } from "./Icon";
import { Option, Select } from "./ui/Select";

type OrderBySelectProps = {
  orderByAction: OrderByActionTypes;
  defaultValue?: Orders;
};

const OrderBySelect = ({ orderByAction, defaultValue }: OrderBySelectProps) => {
  const dispatch = useOrderByDispatch();

  const handleChange = (
    event: SelectChangeEventType,
    value: SelectValue<{}, {}[]>
  ) => {
    dispatch({
      type: orderByAction,
      payload: {
        order: value as Orders,
      },
    });
  };

  return (
    <Select
      className="max-w-fit"
      startAdornment={
        <Icon
          icon={Icons.SEARCH}
          size={IconSizes.SMALL}
          width="16"
          height="16"
          viewBox="0 0 20 20"
        />
      }
      endAdornment={<Icon icon={Icons.CHEVRON_DOWN} size={IconSizes.SMALL} />}
      defaultValue={defaultValue ?? Orders.DEFAULT}
      onChange={handleChange}
    >
      <Option value="orderBy">Order by</Option>
      <Option value="releaseDate">Release Date</Option>
    </Select>
  );
};

export default OrderBySelect;
