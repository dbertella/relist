"use client";

import { useQueryString } from "@/lib/utils";
import { Toggle } from "@radix-ui/react-toggle";
import Link from "next/link";
import Image from "next/image";

const MenuItem = ({
  path,
  offIcon,
  onIcon,
  title,
}: {
  path: string;
  offIcon: string;
  onIcon: string;
  title: string;
}) => {
  const { params, query, pathname } = useQueryString();
  const isActive = pathname === `/${params.sheetId}/${path}`;
  const homeUrl = `/${params.sheetId}?${query}`;
  const tabUrl = `/${params.sheetId}/${path}?${query}`;
  return (
    <Link href={isActive ? homeUrl : tabUrl}>
      <Image
        src={isActive ? onIcon : offIcon}
        width={40}
        height={40}
        alt={title}
      />
    </Link>
  );
};

export const NavBar = () => {
  const { params, query, pathname } = useQueryString();

  return (
    <menu className="m-4 justify-between items-start flex text-white-100">
      <MenuItem
        path="filter"
        onIcon="/icon/filter=on.svg"
        offIcon="/icon/filter=off.svg"
        title="Filters"
      />

      <MenuItem
        path="sort"
        onIcon="/icon/sort=on.svg"
        offIcon="/icon/sort=off.svg"
        title="Sort"
      />
      <MenuItem
        path="details"
        onIcon="/icon/details=on.svg"
        offIcon="/icon/details=off.svg"
        title="Filters"
      />

      <MenuItem
        path="data-source"
        onIcon="/icon/database=on.svg"
        offIcon="/icon/database=off.svg"
        title="Data Source"
      />
    </menu>
  );
};
