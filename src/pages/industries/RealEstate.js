import React from "react";
import GenericPage from '../GenericPage';

import { INDUSTRIES } from "../../content/pages";

export default function RealEstate() {
  return <GenericPage content={INDUSTRIES["real-estate"]} />;
}
