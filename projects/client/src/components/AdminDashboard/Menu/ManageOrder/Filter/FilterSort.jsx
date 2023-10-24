import { useSearchParams } from "react-router-dom";
import {
  LiaSortAlphaDownSolid as IcDesc,
  LiaSortAlphaUpSolid as IcAsc,
} from "react-icons/lia";
import { Icon } from "@chakra-ui/react";

function FilterSort({defaultSort = "DESC"}) {
  const [searchParams, setSearchParams] = useSearchParams({});
  const currentSort = searchParams.get("sort") || defaultSort;

  function handleChange() {
    setSearchParams((prev) => {
      prev.set("sort", currentSort === "DESC" ? "ASC" : "DESC");
      return prev;
    });
  }

  const sortAttr = {
    as: currentSort === "DESC" ? IcDesc : IcAsc,
    fontSize: "2xl",
    cursor: "pointer",
    onClick: handleChange,
  };

  return <Icon {...sortAttr} />;
}

export default FilterSort;
