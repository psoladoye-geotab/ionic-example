package com.geotab.plugins.keylessplugin

import android.util.Log
import com.geotab.keyless.AndroidLogger
import com.geotab.keyless.Error
import com.geotab.keyless.KeylessClient
import com.geotab.keyless.KeylessClientDelegate
import com.geotab.keyless.Operation
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.NativePlugin
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import org.json.JSONArray

@NativePlugin
class KeylessPlugin : Plugin(), KeylessClientDelegate {
  private val keylessClient: KeylessClient by lazy {
    KeylessClient(context.applicationContext, AndroidLogger())
  }

  override fun load() {
    keylessClient.delegate = this;
    super.load()
  }

  @PluginMethod
  fun connect(call: PluginCall) {
    Log.d(TAG, "Connecting...")

    val keylessToken = call.getString(KEYLESS_TOKEN_KEY)

    if (!call.data.has(KEYLESS_TOKEN_KEY) || keylessToken == null) {
      call.reject("Must provide keyless token")
      return
    }
    try {
      keylessClient.connect(keylessToken)
      call.resolve()
    } catch (e: Exception) {
      call.reject(e.localizedMessage, e)
    }
  }

  @PluginMethod
  fun execute(call: PluginCall) {
    Log.d(TAG, "Executing...")

    val keylessToken = call.getString(KEYLESS_TOKEN_KEY)
    val operations = call.getArray(DEVICE_OPERATIONS_KEY, JSArray())

    if (!call.data.has(KEYLESS_TOKEN_KEY) || keylessToken == null) {
      call.reject("Must provide keyless token")
      return
    }
    if (!call.data.has(DEVICE_OPERATIONS_KEY) || operations == null) {
      call.reject("Must provide device operations to execute")
      return
    }
    try {
      val mappedOperations = transform(operations)
      keylessClient.execute(mappedOperations, keylessToken)
      call.resolve()
    } catch (e: Exception) {
      call.reject(e.localizedMessage, e)
    }
  }

  @PluginMethod
  fun disconnect(call: PluginCall) {
    keylessClient.disconnect()
    call.resolve()
  }

  private fun transform(operations: JSONArray): Set<Operation> {
    val mappedOperations = mutableSetOf<Operation>()
    for (i in 0 until operations.length()) {
      mappedOperations.add(map(operations[i].toString()))
    }
    return mappedOperations
  }

  private fun map(deviceOperation: String): Operation {
    return when (deviceOperation) {
      "Locate" -> Operation.LOCATE
      "Lock" -> Operation.LOCK
      "Unlock" -> Operation.UNLOCK_ALL
      "IgnitionEnable" -> Operation.IGNITION_ENABLE
      "IgnitionInhibit" -> Operation.IGNITION_INHIBIT
      "CheckIn" -> Operation.CHECK_IN
      "CheckOut" -> Operation.CHECK_OUT
      else -> throw Exception("Cannot map device operation $deviceOperation")
    }
  }

  override fun onClientConnect(client: KeylessClient) {
    Log.d(TAG, "#onClientConnect")
    notifyListeners("onClientConnect", JSObject())
  }

  override fun onClientDisconnectedUnexpectedly(client: KeylessClient, error: Error) {
    Log.d(TAG, "#onClientDisconnectedUnexpectedly")
    notifyListeners("onClientDisconnectedUnexpectedly", JSObject())
  }

  override fun onClientOperationsFailed(operations: Set<Operation>, error: Error) {
    Log.d(TAG, "#onClientOperationsFailed")
    notifyListeners("onClientOperationsFailed", JSObject())
  }

  override fun onClientOperationsSucceed() {
    Log.d(TAG, "#onClientOperationsSucceed")
    notifyListeners("onClientOperationsSucceed", JSObject())
  }

  companion object {
    private const val TAG = "KEYLESS_SDK"
    private const val KEYLESS_TOKEN_KEY = "keylessToken"
    private const val DEVICE_OPERATIONS_KEY = "deviceOperations"
  }
}
