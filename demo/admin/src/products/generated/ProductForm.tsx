// This file has been generated by comet admin-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.

import { useApolloClient, useQuery } from "@apollo/client";
import {
    Field,
    FinalForm,
    FinalFormCheckbox,
    FinalFormInput,
    FinalFormSaveSplitButton,
    FinalFormSelect,
    FinalFormSubmitEvent,
    Loading,
    MainContent,
    Toolbar,
    ToolbarActions,
    ToolbarFillSpace,
    ToolbarItem,
    ToolbarTitleItem,
    useFormApiRef,
    useStackApi,
    useStackSwitchApi,
} from "@comet/admin";
import { FinalFormDatePicker } from "@comet/admin-date-time";
import { ArrowLeft } from "@comet/admin-icons";
import { BlockState, createFinalFormBlock } from "@comet/blocks-admin";
import { DamImageBlock, EditPageLayout, queryUpdatedAt, resolveHasSaveConflict, useFormSaveConflict } from "@comet/cms-admin";
import { FormControlLabel, IconButton, MenuItem } from "@mui/material";
import { FormApi } from "final-form";
import { filter } from "graphql-anywhere";
import isEqual from "lodash.isequal";
import React from "react";
import { FormattedMessage } from "react-intl";

import { createProductMutation, productFormFragment, productFormQuery, updateProductMutation } from "./ProductForm.gql";
import {
    GQLCreateProductMutation,
    GQLCreateProductMutationVariables,
    GQLProductFormFragment,
    GQLProductFormQuery,
    GQLProductFormQueryVariables,
    GQLUpdateProductMutation,
    GQLUpdateProductMutationVariables,
} from "./ProductForm.gql.generated";

const rootBlocks = {
    image: DamImageBlock,
};

type FormValues = Omit<GQLProductFormFragment, "price"> & {
    price: string;
    image: BlockState<typeof rootBlocks.image>;
};

interface FormProps {
    id?: string;
}

export function ProductForm({ id }: FormProps): React.ReactElement {
    const stackApi = useStackApi();
    const client = useApolloClient();
    const mode = id ? "edit" : "add";
    const formApiRef = useFormApiRef<FormValues>();
    const stackSwitchApi = useStackSwitchApi();

    const { data, error, loading, refetch } = useQuery<GQLProductFormQuery, GQLProductFormQueryVariables>(
        productFormQuery,
        id ? { variables: { id } } : { skip: true },
    );

    const initialValues = React.useMemo<Partial<FormValues>>(
        () =>
            data?.product
                ? {
                      ...filter<GQLProductFormFragment>(productFormFragment, data.product),
                      price: String(data.product.price),
                      image: rootBlocks.image.input2State(data.product.image),
                  }
                : {
                      inStock: false,
                      image: rootBlocks.image.defaultValues(),
                  },
        [data],
    );

    const saveConflict = useFormSaveConflict({
        checkConflict: async () => {
            const updatedAt = await queryUpdatedAt(client, "product", id);
            return resolveHasSaveConflict(data?.product.updatedAt, updatedAt);
        },
        formApiRef,
        loadLatestVersion: async () => {
            await refetch();
        },
    });

    const handleSubmit = async (state: FormValues, form: FormApi<FormValues>, event: FinalFormSubmitEvent) => {
        if (await saveConflict.checkForConflicts()) {
            throw new Error("Conflicts detected");
        }

        const output = {
            ...state,
            price: parseFloat(state.price),
            image: rootBlocks.image.state2Output(state.image),
        };

        if (mode === "edit") {
            if (!id) {
                throw new Error("Missing id in edit mode");
            }
            await client.mutate<GQLUpdateProductMutation, GQLUpdateProductMutationVariables>({
                mutation: updateProductMutation,
                variables: { id, input: output, lastUpdatedAt: data?.product?.updatedAt },
            });
        } else {
            const { data: mutationResponse } = await client.mutate<GQLCreateProductMutation, GQLCreateProductMutationVariables>({
                mutation: createProductMutation,
                variables: { input: output },
            });
            if (!event.navigatingBack) {
                const id = mutationResponse?.createProduct.id;
                if (id) {
                    setTimeout(() => {
                        stackSwitchApi.activatePage("edit", id);
                    });
                }
            }
        }
    };

    if (error) throw error;

    if (loading) {
        return <Loading behavior="fillPageHeight" />;
    }

    return (
        <FinalForm<FormValues> apiRef={formApiRef} onSubmit={handleSubmit} mode={mode} initialValues={initialValues}>
            {({ values }) => (
                <EditPageLayout>
                    {saveConflict.dialogs}
                    <Toolbar>
                        <ToolbarItem>
                            <IconButton onClick={stackApi?.goBack}>
                                <ArrowLeft />
                            </IconButton>
                        </ToolbarItem>
                        <ToolbarTitleItem>
                            <FormattedMessage id="products.Product" defaultMessage="Product" />
                        </ToolbarTitleItem>
                        <ToolbarFillSpace />
                        <ToolbarActions>
                            <FinalFormSaveSplitButton hasConflict={saveConflict.hasConflict} />
                        </ToolbarActions>
                    </Toolbar>
                    <MainContent>
                        <Field
                            required
                            fullWidth
                            name="title"
                            component={FinalFormInput}
                            label={<FormattedMessage id="product.title" defaultMessage="Title" />}
                        />
                        <Field
                            required
                            fullWidth
                            name="slug"
                            component={FinalFormInput}
                            label={<FormattedMessage id="product.slug" defaultMessage="Slug" />}
                        />
                        <Field
                            required
                            fullWidth
                            name="description"
                            component={FinalFormInput}
                            label={<FormattedMessage id="product.description" defaultMessage="Description" />}
                        />
                        <Field fullWidth name="type" label={<FormattedMessage id="product.type" defaultMessage="Type" />}>
                            {(props) => (
                                <FinalFormSelect {...props}>
                                    <MenuItem value="Cap">
                                        <FormattedMessage id="product.type.cap" defaultMessage="Cap" />
                                    </MenuItem>
                                    <MenuItem value="Shirt">
                                        <FormattedMessage id="product.type.shirt" defaultMessage="Shirt" />
                                    </MenuItem>
                                    <MenuItem value="Tie">
                                        <FormattedMessage id="product.type.tie" defaultMessage="Tie" />
                                    </MenuItem>
                                </FinalFormSelect>
                            )}
                        </Field>
                        <Field
                            fullWidth
                            name="price"
                            component={FinalFormInput}
                            type="number"
                            label={<FormattedMessage id="product.price" defaultMessage="Price" />}
                        />
                        <Field name="inStock" label="" type="checkbox" fullWidth>
                            {(props) => (
                                <FormControlLabel
                                    label={<FormattedMessage id="product.inStock" defaultMessage="In Stock" />}
                                    control={<FinalFormCheckbox {...props} />}
                                />
                            )}
                        </Field>
                        <Field
                            fullWidth
                            name="availableSince"
                            component={FinalFormDatePicker}
                            label={<FormattedMessage id="product.availableSince" defaultMessage="Available Since" />}
                        />
                        <Field name="image" isEqual={isEqual}>
                            {createFinalFormBlock(rootBlocks.image)}
                        </Field>
                    </MainContent>
                </EditPageLayout>
            )}
        </FinalForm>
    );
}
