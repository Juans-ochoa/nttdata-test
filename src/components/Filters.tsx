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

const INITIAL_STATE_FITER = {
  name: "",
  locationId: 0,
  minClanLevel: 2,
};

export default function Filters({ filter, updateFilter }: Props) {
  const [dataFilter, setDataFilter] = useState(filter);
  const [locations, setLocations] = useState([]);

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

  const clearFilter = () => {
    setDataFilter(INITIAL_STATE_FITER);
    updateFilter(INITIAL_STATE_FITER);
  };

  const formFilter = (e: any) => {
    e.preventDefault();
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
              className='form-control'
              placeholder='Name'
            />
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
              className='form-control'
              placeholder='minClanLevel'
              min={INITIAL_STATE_FITER.minClanLevel}
            />
          </article>
          <article className='col'>
            <button
              type='submit'
              className='btn btn-outline-primary fw-bold rounded-pill mx-1 font__size_14'>
              Search
            </button>
            <button
              type='button'
              onClick={clearFilter}
              className='btn btn-outline-dark fw-bold rounded-pill mx-1 font__size_14'>
              Clear filter
            </button>
          </article>
        </section>
      </form>
    </>
  );
}
