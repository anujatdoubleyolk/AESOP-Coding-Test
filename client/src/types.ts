import React from "react";

export interface ITableProps {
  cols: string[];
  data: Record<string, string>[];
}

export interface IPropsACcordian {
  title: string;
  children: React.ReactNode;
}

export interface IPropsListBox {
  value: string;
  onChange: (e: string) => any;
  options: string[];
}
