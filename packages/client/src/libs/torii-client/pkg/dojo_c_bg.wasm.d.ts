/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory
export function __wbg_toriiclient_free(a: number): void
export function __wbg_provider_free(a: number): void
export function __wbg_account_free(a: number): void
export function __wbg_subscription_free(a: number): void
export function __wbg_get_subscription_id(a: number): number
export function __wbg_set_subscription_id(a: number, b: number): void
export function typedDataEncode(a: number, b: number, c: number, d: number, e: number): void
export function signingKeyNew(a: number): void
export function signingKeySign(a: number, b: number, c: number, d: number, e: number): void
export function verifyingKeyNew(a: number, b: number, c: number): void
export function verifyingKeyVerify(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): void
export function createProvider(a: number, b: number, c: number): void
export function provider_createAccount(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
): number
export function provider_call(a: number, b: number, c: number): number
export function provider_waitForTransaction(a: number, b: number, c: number): number
export function account_address(a: number, b: number): void
export function account_chainId(a: number, b: number): void
export function account_setBlockId(a: number, b: number, c: number, d: number): void
export function account_executeRaw(a: number, b: number, c: number): number
export function account_deployBurner(a: number, b: number, c: number): number
export function account_nonce(a: number): number
export function hashGetContractAddress(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  g: number,
  h: number,
  i: number,
): void
export function getSelectorFromTag(a: number, b: number, c: number): void
export function byteArraySerialize(a: number, b: number, c: number): void
export function byteArrayDeserialize(a: number, b: number, c: number): void
export function poseidonHash(a: number, b: number, c: number): void
export function getSelectorFromName(a: number, b: number, c: number): void
export function starknetKeccak(a: number, b: number): void
export function cairoShortStringToFelt(a: number, b: number, c: number): void
export function parseCairoShortString(a: number, b: number, c: number): void
export function toriiclient_getEntities(a: number, b: number): number
export function toriiclient_getAllEntities(a: number, b: number, c: number): number
export function toriiclient_getEventMessages(a: number, b: number): number
export function toriiclient_onEntityUpdated(a: number, b: number, c: number, d: number): number
export function toriiclient_updateEntitySubscription(
  a: number,
  b: number,
  c: number,
  d: number,
): number
export function toriiclient_onEventMessageUpdated(
  a: number,
  b: number,
  c: number,
  d: number,
): number
export function toriiclient_updateEventMessageSubscription(
  a: number,
  b: number,
  c: number,
  d: number,
): number
export function toriiclient_publishMessage(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
): number
export function subscription_cancel(a: number): void
export function createClient(a: number): number
export function __wbg_intounderlyingbytesource_free(a: number): void
export function intounderlyingbytesource_type(a: number, b: number): void
export function intounderlyingbytesource_autoAllocateChunkSize(a: number): number
export function intounderlyingbytesource_start(a: number, b: number): void
export function intounderlyingbytesource_pull(a: number, b: number): number
export function intounderlyingbytesource_cancel(a: number): void
export function __wbg_queuingstrategy_free(a: number): void
export function queuingstrategy_highWaterMark(a: number): number
export function __wbg_intounderlyingsink_free(a: number): void
export function intounderlyingsink_write(a: number, b: number): number
export function intounderlyingsink_close(a: number): number
export function intounderlyingsink_abort(a: number, b: number): number
export function __wbg_intounderlyingsource_free(a: number): void
export function intounderlyingsource_pull(a: number, b: number): number
export function intounderlyingsource_cancel(a: number): void
export function __wbg_readablestreamgetreaderoptions_free(a: number): void
export function readablestreamgetreaderoptions_mode(a: number): number
export function __wbg_pipeoptions_free(a: number): void
export function pipeoptions_preventClose(a: number): number
export function pipeoptions_preventCancel(a: number): number
export function pipeoptions_preventAbort(a: number): number
export function pipeoptions_signal(a: number): number
export function __wbindgen_malloc(a: number, b: number): number
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number
export const __wbindgen_export_2: WebAssembly.Table
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h30748262f1b7d27c(
  a: number,
  b: number,
  c: number,
): void
export function _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb74b4e0cfb480659(
  a: number,
  b: number,
): void
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcbe5adb8ab3b7d0e(
  a: number,
  b: number,
  c: number,
): void
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0616717051788241(
  a: number,
  b: number,
  c: number,
): void
export function __wbindgen_add_to_stack_pointer(a: number): number
export function __wbindgen_free(a: number, b: number, c: number): void
export function __wbindgen_exn_store(a: number): void
export function wasm_bindgen__convert__closures__invoke2_mut__h3e82d67bb2b557d3(
  a: number,
  b: number,
  c: number,
  d: number,
): void
