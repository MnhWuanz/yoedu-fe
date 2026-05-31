import AntdProvider from "@/app/providers/antd/AntdProvider";
import ThemeProvider from "@/app/providers/theme/ThemeProvider";
import { store } from "@/app/redux/store";
import { router } from "@/app/router/routes";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AntdProvider>
          <RouterProvider router={router} />
        </AntdProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App;
