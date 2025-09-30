package tokenfactory

import (
	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"

	"example/x/tokenfactory/types"
)

// AutoCLIOptions implements the autocli.HasAutoCLIConfig interface.
func (am AppModule) AutoCLIOptions() *autocliv1.ModuleOptions {
	return &autocliv1.ModuleOptions{
		Query: &autocliv1.ServiceCommandDescriptor{
			Service: types.Query_serviceDesc.ServiceName,
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "Params",
					Use:       "params",
					Short:     "Shows the parameters of the module",
				},
				{
					RpcMethod: "ListDenom",
					Use:       "list-denom",
					Short:     "List all Denom",
				},
				{
					RpcMethod:      "GetDenom",
					Use:            "get-denom [id]",
					Short:          "Gets a Denom",
					Alias:          []string{"show-denom"},
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}},
				},
				// this line is used by ignite scaffolding # autocli/query
			},
		},
		Tx: &autocliv1.ServiceCommandDescriptor{
			Service:              types.Msg_serviceDesc.ServiceName,
			EnhanceCustomCommand: true, // only required if you want to use the custom command
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "UpdateParams",
					Skip:      true, // skipped because authority gated
				},
				{
					RpcMethod:      "CreateDenom",
					Use:            "create-denom [denom] [description] [ticker] [precision] [url] [max-supply] [can-change-max-supply]",
					Short:          "Create a new Denom",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "description"}, {ProtoField: "ticker"}, {ProtoField: "precision"}, {ProtoField: "url"}, {ProtoField: "maxSupply"}, {ProtoField: "canChangeMaxSupply"}},
				},
				{
					RpcMethod:      "UpdateDenom",
					Use:            "update-denom [denom] [description] [url] [max-supply] [can-change-max-supply]",
					Short:          "Update Denom",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "description"},{ProtoField: "url"}, {ProtoField: "maxSupply"},{ProtoField: "canChangeMaxSupply"}},
				},
				// this line is used by ignite scaffolding # autocli/tx
			},
		},
	}
}
