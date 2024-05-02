// This file has been generated by comet admin-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { useApolloClient, useQuery } from "@apollo/client";
import { Field, FinalForm, FinalFormInput, Loading, MainContent, useFormApiRef } from "@comet/admin";
import { EditPageLayout, queryUpdatedAt, resolveHasSaveConflict, useFormSaveConflict } from "@comet/cms-admin";
import { FormApi } from "final-form";
import { filter } from "graphql-anywhere";
import isEqual from "lodash.isequal";
import React from "react";
import { FormattedMessage } from "react-intl";

import { productFormFragment, productQuery, updateProductMutation } from "./ProductPriceForm.gql";
import {
    GQLProductPriceFormDetailsFragment,
    GQLProductQuery,
    GQLProductQueryVariables,
    GQLUpdateProductMutation,
    GQLUpdateProductMutationVariables,
} from "./ProductPriceForm.gql.generated";

type FormValues = Omit<GQLProductPriceFormDetailsFragment, "price"> & {
    price?: string;
};

interface FormProps {
    id: string;
}

export function ProductPriceForm({ id }: FormProps): React.ReactElement {
    const client = useApolloClient();

    const formApiRef = useFormApiRef<FormValues>();

    const { data, error, loading, refetch } = useQuery<GQLProductQuery, GQLProductQueryVariables>(productQuery, { variables: { id } });

    const initialValues = React.useMemo<Partial<FormValues>>(
        () =>
            data?.product
                ? {
                      ...filter<GQLProductPriceFormDetailsFragment>(productFormFragment, data.product),
                      price: data.product.price ? String(data.product.price) : undefined,
                  }
                : {},
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

    const handleSubmit = async (formValues: FormValues, form: FormApi<FormValues>) => {
        if (await saveConflict.checkForConflicts()) throw new Error("Conflicts detected");
        const output = {
            ...formValues,
            price: formValues.price ? parseFloat(formValues.price) : null,
        };

        if (!id) throw new Error();
        const { ...updateInput } = output;
        await client.mutate<GQLUpdateProductMutation, GQLUpdateProductMutationVariables>({
            mutation: updateProductMutation,
            variables: { id, input: updateInput },
        });
    };

    if (error) throw error;

    if (loading) {
        return <Loading behavior="fillPageHeight" />;
    }

    return (
        <FinalForm<FormValues>
            apiRef={formApiRef}
            onSubmit={handleSubmit}
            mode="edit"
            initialValues={initialValues}
            initialValuesEqual={isEqual} //required to compare block data correctly
            subscription={{}}
        >
            {() => (
                <EditPageLayout>
                    {saveConflict.dialogs}
                    <MainContent>
                        <Field
                            fullWidth
                            name="price"
                            component={FinalFormInput}
                            type="number"
                            label={<FormattedMessage id="product.price" defaultMessage="Price" />}
                            helperText={<FormattedMessage id="product.price.helperText" defaultMessage="Enter price in this format: 123,45" />}
                        />
                    </MainContent>
                </EditPageLayout>
            )}
        </FinalForm>
    );
}
