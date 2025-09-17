import React from "react";
import GenericPage from '../GenericPage';

import { INDUSTRIES } from "../../content/pages";

export default function SaaS() {
  return <GenericPage content={INDUSTRIES["saas"]} />;
}
