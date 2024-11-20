var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/proxy.js
var proxy_exports = {};
__export(proxy_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(proxy_exports);
var handler = async (event) => {
  const { path: PATH, rawQuery: RAW_QUERY, httpMethod: HTTP_METHOD, headers: HEADERS, body: BODY } = event;
  const TARGET_PATH = PATH.replace("/.netlify/functions/proxy", "").replace("/api", "");
  const TARGET_URL = `https://rateengine.ship.cars/v2/vehicles${TARGET_PATH}?${RAW_QUERY || ""}`;
  const ERROR = {
    fetchMessages: {
      fetchUnsuccessful: "Unexpected fetch response",
      fetchNotExecuted: "Fetch could not be executed at this time"
    },
    data: "No data",
    emptyMessage: "No message",
    proxyStatus: 500
  };
  try {
    const FETCH_OPTIONS = {
      method: HTTP_METHOD,
      headers: { ...HEADERS },
      body: HTTP_METHOD !== "GET" ? BODY : null
    };
    const RESPONSE = await fetch(TARGET_URL, FETCH_OPTIONS);
    let data = ERROR.data;
    if (RESPONSE.ok) {
      data = await RESPONSE.json();
    } else {
      console.error(ERROR.fetchMessages.fetchUnsuccessful);
    }
    return {
      statusCode: RESPONSE.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error(`${ERROR.fetchMessages.fetchNotExecuted}: `, error);
    return {
      statusCode: ERROR.proxyStatus,
      body: JSON.stringify({ error: ERROR.fetchMessages.fetchNotExecuted, message: error?.message || ERROR.emptyMessage })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=proxy.js.map
