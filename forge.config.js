module.exports = {
  packagerConfig: {
    asar: true,
    osxSign: {},
    osxNotarize: {
      tool: "notarytool",
      appleId: "main@xprtis.com",
      appleIdPassword: "vbbe-zwae-mcaw-ttoe",
      teamId: "H25QV2PV39",
    },
  },

  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
