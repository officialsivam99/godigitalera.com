import React from "react";
import GenericPage from '../GenericPage';

import { INDUSTRIES } from "../../content/pages";

export default function Ecommerce() {
  return <GenericPage content={INDUSTRIES["ecommerce"]} />;
}
