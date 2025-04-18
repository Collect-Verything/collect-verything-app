import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import {RefObject} from "react";

export interface DialogProps<T> {
    buttonElement: RefObject<HTMLButtonElement>;
    rippleRef: RefObject<TouchRippleActions>;
    row: T;
}
