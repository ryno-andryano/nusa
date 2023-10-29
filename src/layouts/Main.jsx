import * as PropTypes from "prop-types";

function Main({ children }) {
  return (
    <main className="ml-24 min-h-screen w-full bg-gray-100">{children}</main>
  );
}

Main.propTypes = { children: PropTypes.element };

export default Main;
