import React from "react";
import GenericPage from '../GenericPage';

import { INDUSTRIES } from "../../content/pages";

export default function Local() {
  return <GenericPage content={INDUSTRIES["local"]} />;
}
