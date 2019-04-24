import * as React from "react";
import {Link} from "react-router-dom";
import {components} from "../../components-generated";

const HomePage = () => (
  <div>
    <h1>Snoopy</h1>
    {components.map(({name, component}) => (
      <h2 key={name}>
        <Link to={`/${name}`}>{name}</Link>
      </h2>
    ))}
  </div>
);

export default HomePage;