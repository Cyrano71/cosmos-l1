import { computed, ref } from "vue";

import { useClient } from "@/composables/useClient";

const useAddressInstance = () => {
  const client = useClient();
  const address = ref("cosmos166a9lfw3zpjr7tc8z9j9gpcx92clvct2m026j7");
  const setAddress = async () => {
    if (client.signer) {
      const [{ address: rawAddress }] = await client.signer.getAccounts();
      console.log("rawAddress", rawAddress);
      address.value = rawAddress;
    } else {
      address.value = "cosmos166a9lfw3zpjr7tc8z9j9gpcx92clvct2m026j7";
    }
  };
  client.on("signer-changed", () => {
    setAddress();
  });
  window.addEventListener("keplr_keystorechange", () => {
    setAddress();
  });

  setAddress();

  const shortAddress = computed<string>(
    () => address.value.substring(0, 10) + "..." + address.value.slice(-4)
  );

  return {
    address,
    shortAddress,
  };
};

let addressInstance: ReturnType<typeof useAddressInstance>;

export const useAddress = () => {
  if (!addressInstance) {
    addressInstance = useAddressInstance();
  }
  return addressInstance;
};
