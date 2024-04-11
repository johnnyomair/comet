// This file has been generated by comet admin-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { gql, useApolloClient, useQuery } from "@apollo/client";
import {
    CrudContextMenu,
    GridFilterButton,
    MainContent,
    muiGridFilterToGql,
    muiGridSortToGql,
    StackLink,
    Toolbar,
    ToolbarActions,
    ToolbarAutomaticTitleItem,
    ToolbarFillSpace,
    ToolbarItem,
    useBufferedRowCount,
    useDataGridRemote,
    usePersistentColumnState,
} from "@comet/admin";
import { Add as AddIcon, Edit } from "@comet/admin-icons";
import { DamImageBlock } from "@comet/cms-admin";
import { Button, IconButton } from "@mui/material";
import { DataGridPro, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
import { GQLProductFilter } from "@src/graphql.generated";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
    GQLCreateProductMutation,
    GQLCreateProductMutationVariables,
    GQLDeleteProductMutation,
    GQLDeleteProductMutationVariables,
    GQLProductsGridFutureFragment,
    GQLProductsGridQuery,
    GQLProductsGridQueryVariables,
} from "./ProductsGrid.generated";

const productsFragment = gql`
    fragment ProductsGridFuture on Product {
        id
        title
        status
        slug
        description
        type
        price
        inStock
        soldCount
        availableSince
        image
        createdAt
        updatedAt
    }
`;

const productsQuery = gql`
    query ProductsGrid($offset: Int, $limit: Int, $sort: [ProductSort!], $search: String, $filter: ProductFilter) {
        products(offset: $offset, limit: $limit, sort: $sort, search: $search, filter: $filter) {
            nodes {
                ...ProductsGridFuture
            }
            totalCount
        }
    }
    ${productsFragment}
`;

const deleteProductMutation = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

const createProductMutation = gql`
    mutation CreateProduct($input: ProductInput!) {
        createProduct(input: $input) {
            id
        }
    }
`;

function ProductsGridToolbar() {
    return (
        <Toolbar>
            <ToolbarAutomaticTitleItem />
            <ToolbarItem>
                <GridToolbarQuickFilter />
            </ToolbarItem>
            <ToolbarItem>
                <GridFilterButton />
            </ToolbarItem>
            <ToolbarFillSpace />
            <ToolbarActions>
                <Button startIcon={<AddIcon />} component={StackLink} pageName="add" payload="add" variant="contained" color="primary">
                    <FormattedMessage id="product.newProduct" defaultMessage="New Product" />
                </Button>
            </ToolbarActions>
        </Toolbar>
    );
}

type Props = {
    filter?: GQLProductFilter;
};

export function ProductsGrid({ filter }: Props): React.ReactElement {
    const client = useApolloClient();
    const intl = useIntl();
    const dataGridProps = { ...useDataGridRemote(), ...usePersistentColumnState("ProductsGrid") };

    const columns: GridColDef<GQLProductsGridFutureFragment>[] = [
        { field: "inStock", headerName: intl.formatMessage({ id: "product.inStock", defaultMessage: "In stock" }), type: "boolean", width: 90 },
        { field: "title", headerName: intl.formatMessage({ id: "product.title", defaultMessage: "Titel" }), flex: 1, maxWidth: 250, minWidth: 200 },
        {
            field: "description",
            headerName: intl.formatMessage({ id: "product.description", defaultMessage: "Description" }),
            flex: 1,
            minWidth: 150,
        },
        {
            field: "price",
            headerName: intl.formatMessage({ id: "product.price", defaultMessage: "Price" }),
            type: "number",
            flex: 1,
            maxWidth: 150,
            minWidth: 150,
        },
        {
            field: "type",
            headerName: intl.formatMessage({ id: "product.type", defaultMessage: "Type" }),
            type: "singleSelect",
            valueOptions: [
                { value: "Cap", label: intl.formatMessage({ id: "product.type.cap", defaultMessage: "Cap" }) },
                { value: "Shirt", label: intl.formatMessage({ id: "product.type.shirt", defaultMessage: "Shirt" }) },
                { value: "Tie", label: intl.formatMessage({ id: "product.type.tie", defaultMessage: "Tie" }) },
            ],
            flex: 1,
            maxWidth: 150,
            minWidth: 150,
        },
        {
            field: "availableSince",
            headerName: intl.formatMessage({ id: "product.availableSince", defaultMessage: "Available Since" }),
            type: "date",
            valueGetter: ({ value }) => value && new Date(value),
            width: 140,
        },
        {
            field: "createdAt",
            headerName: intl.formatMessage({ id: "product.createdAt", defaultMessage: "Created At" }),
            type: "dateTime",
            valueGetter: ({ value }) => value && new Date(value),
            width: 170,
        },
        {
            field: "actions",
            headerName: "",
            sortable: false,
            filterable: false,
            type: "actions",
            align: "right",
            renderCell: (params) => {
                return (
                    <>
                        <IconButton component={StackLink} pageName="edit" payload={params.row.id}>
                            <Edit color="primary" />
                        </IconButton>
                        <CrudContextMenu
                            copyData={() => {
                                const row = params.row;
                                return {
                                    title: row.title,
                                    status: row.status,
                                    slug: row.slug,
                                    description: row.description,
                                    type: row.type,
                                    price: row.price,
                                    inStock: row.inStock,
                                    availableSince: row.availableSince,
                                    image: DamImageBlock.state2Output(DamImageBlock.input2State(row.image)),
                                };
                            }}
                            onPaste={async ({ input }) => {
                                await client.mutate<GQLCreateProductMutation, GQLCreateProductMutationVariables>({
                                    mutation: createProductMutation,
                                    variables: { input },
                                });
                            }}
                            onDelete={async () => {
                                await client.mutate<GQLDeleteProductMutation, GQLDeleteProductMutationVariables>({
                                    mutation: deleteProductMutation,
                                    variables: { id: params.row.id },
                                });
                            }}
                            refetchQueries={[productsQuery]}
                        />
                    </>
                );
            },
        },
    ];

    const { filter: gqlFilter, search: gqlSearch } = muiGridFilterToGql(columns, dataGridProps.filterModel);

    const { data, loading, error } = useQuery<GQLProductsGridQuery, GQLProductsGridQueryVariables>(productsQuery, {
        variables: {
            filter: { and: [gqlFilter, ...(filter ? [filter] : [])] },
            search: gqlSearch,
            offset: dataGridProps.page * dataGridProps.pageSize,
            limit: dataGridProps.pageSize,
            sort: muiGridSortToGql(dataGridProps.sortModel),
        },
    });
    const rowCount = useBufferedRowCount(data?.products.totalCount);
    if (error) throw error;
    const rows = data?.products.nodes ?? [];

    return (
        <MainContent fullHeight disablePadding>
            <DataGridPro
                {...dataGridProps}
                disableSelectionOnClick
                rows={rows}
                rowCount={rowCount}
                columns={columns}
                loading={loading}
                components={{
                    Toolbar: ProductsGridToolbar,
                }}
            />
        </MainContent>
    );
}
