# example
**example** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

to run the blockchain and build the executable
```
ignite chain serve
```

copy the executable in the current directory
```
cp /home/berthier/go/bin/exampled .
```

create a memecoin
```
./exampled tx tokenfactory create-denom \
  "Ced mega big brain token" \
  "Mon token personnalisé" \
  "Ced" \
  6 \
  "https://example.com" \
  1000000000000 \
  true \
  --from cosmos16tvtzq8y60caw6lf3g93jual4w5ph4py6j57nu
```

In bug.gen.ts.yaml use local proto generator to avoid 
rate limite
```
plugins:
  - local: protoc-gen-ts_proto
```

generate ts client
```
ignite chain serve (build and generate the proto files)
ignite generate ts-client
```

generate example-ts-client
in ts-client folder
```
npm install
npm run build
```

create front end
```
ignite scaffold vue
cd vue
pnpm install
pnpm dev
```