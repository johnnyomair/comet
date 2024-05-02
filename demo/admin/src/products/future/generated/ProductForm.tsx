// This file has been generated by comet admin-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { useApolloClient, useQuery } from "@apollo/client";
import {
    Field,
    FinalForm,
    FinalFormCheckbox,
    FinalFormSelect,
    FinalFormSubmitEvent,
    Loading,
    MainContent,
    TextAreaField,
    TextField,
    useAsyncOptionsProps,
    useFormApiRef,
    useStackSwitchApi,
} from "@comet/admin";
import { FinalFormDatePicker } from "@comet/admin-date-time";
import { Lock } from "@comet/admin-icons";
import { BlockState, createFinalFormBlock } from "@comet/blocks-admin";
import { DamImageBlock, EditPageLayout, queryUpdatedAt, resolveHasSaveConflict, useFormSaveConflict } from "@comet/cms-admin";
import { FormControlLabel, InputAdornment, MenuItem } from "@mui/material";
import { FormApi } from "final-form";
import { filter } from "graphql-anywhere";
import isEqual from "lodash.isequal";
import React from "react";
import { FormattedMessage } from "react-intl";

import { validateTitle } from "../validateTitle";
import { createProductMutation, productCategoriesQuery, productFormFragment, productQuery, updateProductMutation } from "./ProductForm.gql";
import {
    GQLCreateProductMutation,
    GQLCreateProductMutationVariables,
    GQLProductCategoriesSelectQuery,
    GQLProductCategoriesSelectQueryVariables,
    GQLProductCategorySelectFragment,
    GQLProductFormDetailsFragment,
    GQLProductQuery,
    GQLProductQueryVariables,
    GQLUpdateProductMutation,
    GQLUpdateProductMutationVariables,
} from "./ProductForm.gql.generated";

const rootBlocks = {
    image: DamImageBlock,
};

type FormValues = GQLProductFormDetailsFragment & {
    image: BlockState<typeof rootBlocks.image>;
};

interface FormProps {
    id?: string;
}

export function ProductForm({ id }: FormProps): React.ReactElement {
    const client = useApolloClient();
    const mode = id ? "edit" : "add";
    const formApiRef = useFormApiRef<FormValues>();
    const stackSwitchApi = useStackSwitchApi();

    const { data, error, loading, refetch } = useQuery<GQLProductQuery, GQLProductQueryVariables>(
        productQuery,
        id ? { variables: { id } } : { skip: true },
    );

    const initialValues = React.useMemo<Partial<FormValues>>(
        () =>
            data?.product
                ? {
                      ...filter<GQLProductFormDetailsFragment>(productFormFragment, data.product),

                      createdAt: data.product.createdAt ? new Date(data.product.createdAt) : undefined,
                      availableSince: data.product.availableSince ? new Date(data.product.availableSince) : undefined,
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

    const handleSubmit = async (formValues: FormValues, form: FormApi<FormValues>, event: FinalFormSubmitEvent) => {
        if (await saveConflict.checkForConflicts()) throw new Error("Conflicts detected");
        const output = {
            ...formValues,
            category: formValues.category?.id,
            image: rootBlocks.image.state2Output(formValues.image),
        };
        if (mode === "edit") {
            if (!id) throw new Error();
            const { createdAt, ...updateInput } = output;
            await client.mutate<GQLUpdateProductMutation, GQLUpdateProductMutationVariables>({
                mutation: updateProductMutation,
                variables: { id, input: updateInput },
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
                        stackSwitchApi.activatePage(`edit`, id);
                    });
                }
            }
        }
    };

    const categorySelectAsyncProps = useAsyncOptionsProps(async () => {
        const result = await client.query<GQLProductCategoriesSelectQuery, GQLProductCategoriesSelectQueryVariables>({
            query: productCategoriesQuery,
        });
        return result.data.productCategories.nodes;
    });

    if (error) throw error;

    if (loading) {
        return <Loading behavior="fillPageHeight" />;
    }

    return (
        <FinalForm<FormValues>
            apiRef={formApiRef}
            onSubmit={handleSubmit}
            mode={mode}
            initialValues={initialValues}
            initialValuesEqual={isEqual} //required to compare block data correctly
            subscription={{}}
        >
            {() => (
                <EditPageLayout>
                    {saveConflict.dialogs}
                    <MainContent>
                        <TextField
                            required
                            fullWidth
                            name="title"
                            label={<FormattedMessage id="product.title" defaultMessage="Titel" />}
                            validate={validateTitle}
                        />

                        <TextField required fullWidth name="slug" label={<FormattedMessage id="product.slug" defaultMessage="Slug" />} />

                        <Field
                            readOnly
                            disabled
                            endAdornment={
                                <InputAdornment position="end">
                                    <Lock />
                                </InputAdornment>
                            }
                            fullWidth
                            name="createdAt"
                            component={FinalFormDatePicker}
                            label={<FormattedMessage id="product.createdAt" defaultMessage="Created" />}
                        />

                        <TextAreaField
                            required
                            fullWidth
                            name="description"
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
                            name="category"
                            label={<FormattedMessage id="product.category" defaultMessage="Category" />}
                            component={FinalFormSelect}
                            {...categorySelectAsyncProps}
                            getOptionLabel={(option: GQLProductCategorySelectFragment) => option.title}
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
