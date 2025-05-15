import { PATH_NAME } from "../../../common/const/path";
import { SECTION_NAME } from "../../../common/const/section";

export interface WebsitePageItemsProps {
    link: string;
    label: string;
}

export const websitePageItems: WebsitePageItemsProps[] = [
    { link: PATH_NAME.VITRINE, label: SECTION_NAME.VITRINE },
    { link: PATH_NAME.BOUTIQUE, label: SECTION_NAME.BOUTIQUE },
    { link: PATH_NAME.RESSOURCE, label: SECTION_NAME.RESSOURCE },
];
