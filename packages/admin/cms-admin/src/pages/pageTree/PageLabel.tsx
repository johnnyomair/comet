import { Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { FormattedMessage } from "react-intl";

import { MarkedMatches } from "../../common/MarkedMatches";
import { PageTypeIcon } from "./PageTypeIcon";
import { PageTreePage } from "./usePageTree";
import { usePageTreeContext } from "./usePageTreeContext";

interface PageLabelProps {
    page: PageTreePage;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

const PageLabel: React.FunctionComponent<PageLabelProps> = ({ page, disabled, onClick }) => {
    const { documentTypes } = usePageTreeContext();
    const documentType = documentTypes[page.documentType];

    return (
        <Root onClick={onClick}>
            {documentType.menuIcon}
            <PageTypeIcon page={page} disabled={disabled} />
            <LinkText color={page.visibility === "Unpublished" || disabled ? "textSecondary" : "textPrimary"}>
                <MarkedMatches text={page.name} matches={page.matches} />
                {page.visibility === "Archived" && (
                    <ArchivedChip
                        component="span"
                        label={<FormattedMessage id="comet.pages.pages.archived" defaultMessage="Archived" />}
                        color="primary"
                        clickable={false}
                        size="small"
                    />
                )}
            </LinkText>

            {documentType.InfoTag !== undefined && <InfoPanel size="small" label={<documentType.InfoTag page={page} />} />}
        </Root>
    );
};

export default PageLabel;

const InfoPanel = styled(Chip)`
    margin-left: auto;
    margin-right: 10%;
`;

const Root = styled("div")`
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const LinkText = styled(Typography)`
    margin-left: ${({ theme }) => theme.spacing(2)};
`;

const ArchivedChip = styled(Chip)`
    margin-left: ${({ theme }) => theme.spacing(2)};
    cursor: inherit;
` as typeof Chip;
