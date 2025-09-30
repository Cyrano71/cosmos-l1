package types

func NewMsgCreateDenom(
	owner string,
	denom string,
	description string,
	ticker string,
	precision int64,
	url string,
	maxSupply int64,
	canChangeMaxSupply bool,

) *MsgCreateDenom {
	return &MsgCreateDenom{
		Owner:              owner,
		Denom:              denom,
		Description:        description,
		Ticker:             ticker,
		Precision:          precision,
		Url:                url,
		MaxSupply:          maxSupply,
		CanChangeMaxSupply: canChangeMaxSupply,
	}
}

func NewMsgUpdateDenom(
	owner string,
	denom string,
	description string,
	url string,
	maxSupply int64,
	canChangeMaxSupply bool,

) *MsgUpdateDenom {
	return &MsgUpdateDenom{
		Owner:              owner,
		Denom:              denom,
		Description:        description,
		Url:                url,
		MaxSupply:          maxSupply,
		CanChangeMaxSupply: canChangeMaxSupply,
	}
}
