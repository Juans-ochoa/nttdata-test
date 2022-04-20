import { useEffect, useState } from "react";
import axios from "axios";
import { configAxios } from "../config";
import Filters from "./Filters";
import { Filter } from "../types";
import { Clan } from "./Clan";
import { ClanInterface } from "../types";
import { Spinner } from "./Spinner";
import { NoData } from "./NoData";

interface ListClansState {
  filter: Filter;
  clans: Array<ClanInterface>;
  spinner: boolean;
}

interface AxiosClans {
  items: ListClansState["clans"];
  paging: {
    cursors?: {};
  };
}

export default function ListClans() {
  const [filter, setFilter] = useState<ListClansState["filter"]>({
    name: "",
    locationId: 0,
    minClanLevel: 2,
  });
  const [clans, setClans] = useState<ListClansState["clans"]>([]);
  const [loader, setloader] = useState<ListClansState["spinner"]>(false);

  const handelFilter = (dataFilter: Filter): void => {
    setFilter(dataFilter);
  };

  useEffect(() => {
    if (filter.name === "") return;

    axios
      .get<AxiosClans>("/clans/", {
        ...configAxios,
        params: {
          name: filter.name,
          locationId: filter.locationId,
          minClanLevel: filter.minClanLevel,
        },
      })
      .then((res) => {
        const { data } = res;
        setloader(true);
        setClans(data.items);
        setloader(false);
      });
  }, [filter]);
  return (
    <div>
      <Filters filter={filter} updateFilter={handelFilter} />
      {loader ? (
        <Spinner />
      ) : (
        <section className='row d-flex justify-content-center'>
          {clans.length > 0 ? (
            <>
              {clans.map((el: ClanInterface) => (
                <Clan key={el.tag} clan={el} />
              ))}
            </>
          ) : (
            <NoData />
          )}
        </section>
      )}
    </div>
  );
}
