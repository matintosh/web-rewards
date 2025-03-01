'use client';
import { BorderSort } from '@/borders/models/enums/border-sort';
import { BordersOrderBy } from '@/borders/models/enums/borders-order-by.enum';
import { poppins } from '@/consts/fonts';
import { InputOutline } from '@/shared/components/input-outline';
import { ChevronSvg } from '@/shared/svgs/icons';
import { Field, Form, Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation'; // Importar useRouter
import styles from './form-filters.module.css';

export function FiltersBorders() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Usar el hook useRouter

  const queries = {
    orderBy: searchParams.get('orderBy') as BordersOrderBy,
    search: searchParams.get('search'),
    sort: searchParams.get('sort') as BorderSort,
  };

  const orderBy = Object.values(BordersOrderBy).includes(queries.orderBy)
    ? queries.orderBy
    : BordersOrderBy.Rank;

  const sortBy = Object.values(BorderSort).includes(queries.sort)
    ? queries.sort
    : BorderSort.Desc;

  const handleOnSubmit = (values: {
    orderBy: BordersOrderBy;
    sort: BorderSort;
    search: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (values.search) queryParams.set('search', values.search);
    if (values.orderBy) queryParams.set('orderBy', values.orderBy);
    if (values.sort) queryParams.set('sort', values.sort);
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <Formik
      initialValues={{
        orderBy,
        sort: sortBy,
        search: queries.search || '',
      }}
      onSubmit={handleOnSubmit}
    >
      {({ errors, touched, handleChange, values }) => (
        <Form className={styles.container}>
          <InputOutline
            type="text"
            name="search"
            placeholder="Buscar"
            onChange={handleChange}
            error={Boolean(touched.search && errors.search)}
            style={{
              maxWidth: 400,
            }}
          />
          <div className={styles['filter-by-rank']}>
            <label>
              Rango
              <Field
                type="radio"
                name="orderBy"
                value={BordersOrderBy.Rank}
                onChange={handleChange}
              />
            </label>
            <label>
              Fecha
              <Field
                type="radio"
                name="orderBy"
                value={BordersOrderBy.CreatedAt}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles['filter-by-rank']}>
            <label>
              <ChevronSvg
                color={
                  values.sort === BorderSort.Desc
                    ? 'var(--ui-kit-primary-500)'
                    : 'var(--ui-kit-neutral-100)'
                }
                width={30}
                height={30}
              />
              <Field
                type="radio"
                name="sort"
                value={BorderSort.Desc}
                onChange={handleChange}
              />
            </label>
            <label>
              <ChevronSvg
                color={
                  values.sort === BorderSort.Asc
                    ? 'var(--ui-kit-primary-500)'
                    : 'var(--ui-kit-neutral-100)'
                }
                width={30}
                height={30}
              />
              <Field
                type="radio"
                name="sort"
                value={BorderSort.Asc}
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className={`${styles.btnPrimary} ${poppins.className}`}
          >
            Buscar
          </button>
        </Form>
      )}
    </Formik>
  );
}
