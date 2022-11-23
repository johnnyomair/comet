import { gql } from "@apollo/client";

import { redirectActivenessFragment } from "./RedirectActiveness";

export const redirectTargetPageFragment = gql`
    fragment RedirectTargetPage on PageTreeNode {
        id
        name
        path
    }
`;

// @TODO: consider content-scope in query
//
export const redirectTableFragment = gql`
    fragment RedirectTable on Redirect {
        id
        active
        sourceType
        source
        target
        comment
        generationType
        ...RedirectActiveness
    }
    ${redirectActivenessFragment}
`;

export const redirectsQuery = gql`
    query Redirects(
        $scope: RedirectScopeInput!
        $type: RedirectGenerationType
        $active: Boolean
        $query: String
        $sortDirection: SortDirection
        $sortColumnName: String
    ) {
        redirects(scope: $scope, type: $type, active: $active, query: $query, sortDirection: $sortDirection, sortColumnName: $sortColumnName) {
            ...RedirectTable
        }
    }
    ${redirectTableFragment}
`;

export const deleteRedirectMutation = gql`
    mutation DeleteRedirect($id: ID!) {
        deleteRedirect(id: $id)
    }
`;