import { SelectOptionDefinition } from "@mui/base/useSelect";

export interface Props {
  options: SelectOptionDefinition<string>[];
  placeholder?: string;
}

export interface OptionProps {
  children?: React.ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
}
