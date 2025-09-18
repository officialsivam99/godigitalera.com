import React from "react";
import GenericPage from '../GenericPage';

import { INDUSTRIES } from "../../content/pages";

export default function Healthcare() {
  return <GenericPage content={INDUSTRIES["healthcare"]} />;
}
