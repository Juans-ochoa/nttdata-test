import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { configAxios } from "../config";
import { Filter } from "../types";

interface KeyLocation {
  value: number;
  label: string;
}

interface Props {
  filter: Filter;
  updateFilter: (dataFilter: Filter) => void;
}

type Error = {
  message: string;
  error: boolean;
};

interface ErrorsFilds {
  name: Error;
  minClanLevel: Error;
}

const INITIAL_STATE_FITER = {
  name: "",
  locationId: 0,
  minClanLevel: 2,
};

const INITIAL_STATE_ERRORS = {
  name: { message: "", error: false },
  minClanLevel: { message: "", error: false },
};

export default function Filters({ filter, updateFilter }: Props) {
  const [dataFilter, setDataFilter] = useState(filter);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState<ErrorsFilds>(INITIAL_STATE_ERRORS);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | any,
    nameFild = ""
  ) => {
    if (!e) return;
    let name: string, value: string | number;

    if (e.target) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = nameFild;
      value = e.value;
    }

    setDataFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFilds = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    let message: string = "";
    const nameFild: string = e.target.name;

    if (nameFild === "name") {
      message =
        dataFilter.name === ""
          ? "This fild cann't be empy"
          : dataFilter.name.length < 3
          ? "This fild needs min three letters"
          : "";
    }

    if (nameFild === "minClanLevel") {
      message = isNaN(dataFilter.minClanLevel)
        ? "This fild cann't be string"
        : dataFilter.minClanLevel < 2
        ? "This fild cann't be less 2"
        : "";
    }

    setErrors((prev) => ({
      ...prev,
      [nameFild]: { message, error: true },
    }));
  };

  const clearFilter = () => {
    setDataFilter(INITIAL_STATE_FITER);
    setErrors(INITIAL_STATE_ERRORS);
    updateFilter(INITIAL_STATE_FITER);
  };

  const formFilter = (e: any) => {
    e.preventDefault();
    if (
      (errors.name.message !== "" && errors.name.error) ||
      (errors.minClanLevel.message !== "" && errors.minClanLevel.error)
    )
      return;
    updateFilter(dataFilter);
  };

  useEffect(() => {
    axios.get("/locations", configAxios).then((res) => {
      const { data } = res,
        countries = data.items.reduce(
          (acc: any, el: any) =>
            el.isCountry ? [...acc, { value: el.id, label: el.name }] : acc,
          []
        );

      setLocations(countries);
    });
  }, []);

  return (
    <>
      <form onSubmit={formFilter} className='my-3'>
        <section className='row'>
          <article className='col '>
            <input
              name='name'
              type='search'
              onChange={(e) => handleChange(e)}
              value={dataFilter.name}
              onBlur={validateFilds}
              className='form-control'
              placeholder='Name'
            />
            {/* <ErrorInput error={({ ...errors.name })} /> */}
          </article>
          <article className='col'>
            <Select
              name='locationId'
              options={locations}
              onChange={(e) => handleChange(e, "locationId")}
              value={locations.filter(
                (el: KeyLocation) => el.value === dataFilter.locationId
              )}
              className='w-100'
              placeholder='Country...'
            />
          </article>
          <article className='col'>
            <input
              type='number'
              name='minClanLevel'
              onChange={(e) => handleChange(e)}
              value={dataFilter.minClanLevel}
              onBlur={validateFilds}
              className='form-control'
              placeholder='minClanLevel'
              min={INITIAL_STATE_FITER.minClanLevel}
            />
          </article>
          <article className='col'>
            <button
              type='submit'
              className='btn btn-info fw-bold text-white rounded-pill'>
              Search
            </button>
            <button
              type='button'
              onClick={clearFilter}
              className='btn btn-dark fw-bold text-white rounded-pill'>
              Clear filter
            </button>
          </article>
        </section>
      </form>
    </>
  );
}
