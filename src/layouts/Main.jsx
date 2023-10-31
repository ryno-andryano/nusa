import * as PropTypes from "prop-types";

function Main({ children }) {
  return (
    <main className="ml-24 min-h-screen w-full min-w-0 bg-gray-100">
      {children}
    </main>
  );
}

Main.propTypes = { children: PropTypes.element };

export default Main;
