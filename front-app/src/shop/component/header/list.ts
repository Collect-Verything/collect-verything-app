import { SECTION_NAME, URL_FRONT } from "../../../app/router/const";

export interface WebsitePageItemsProps {
    link: string;
    label: string;
}

export const websitePageItems: WebsitePageItemsProps[] = [
    { link: URL_FRONT.VITRINE, label: SECTION_NAME.VITRINE },
    { link: URL_FRONT.BOUTIQUE, label: SECTION_NAME.BOUTIQUE },
    { link: URL_FRONT.RESSOURCE, label: SECTION_NAME.RESSOURCE },
];
