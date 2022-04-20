import { useEffect, useState } from "react";
import axios from "axios";
import { configAxios } from "../config";
import Filters from "./Filters";
import { Filter } from "../types";
import { Clan } from "./Clan";
import { ClanInterface } from "../types";

interface ListClansState {
  filter: Filter;
  clans: Array<ClanInterface>;
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

        setClans(data.items);
      });
  }, [filter]);
  return (
    <div>
      <Filters filter={filter} updateFilter={handelFilter} />
      <section className='row d-flex justify-content-center'>
        {clans.length > 0 ? (
          <>
            {clans.map((el: any) => (
              <Clan key={el.tag} clan={el} />
            ))}
          </>
        ) : (
          <p>No data</p>
        )}
      </section>
    </div>
  );
}
