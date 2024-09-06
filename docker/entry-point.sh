#!/bin/sh

CHAINID=${CHAINID:-testing}
DENOM=${DENOM:-upasg}
BLOCK_GAS_LIMIT=${GAS_LIMIT:-75000000}

IAVL_CACHE_SIZE=${IAVL_CACHE_SIZE:-1562500}
QUERY_GAS_LIMIT=${QUERY_GAS_LIMIT:-5000000}
SIMULATION_GAS_LIMIT=${SIMULATION_GAS_LIMIT:-50000000}
MEMORY_CACHE_SIZE=${MEMORY_CACHE_SIZE:-1000}

# Build genesis file incl account for each address passed in
coins="10000000000000000$DENOM"
passage init --chain-id $CHAINID $CHAINID
passage keys add validator --keyring-backend="test"
passage add-genesis-account validator $coins --keyring-backend="test"

# create account for each passed in address
for addr in "$@"; do
  echo "creating genesis account: $addr"
  passage add-genesis-account $addr $coins --keyring-backend="test"
done

passage gentx validator 10000000000$DENOM --chain-id $CHAINID --keyring-backend="test"
passage collect-gentxs


# Set proper defaults and change ports
sed -i 's/"leveldb"/"goleveldb"/g' ~/.passage/config/config.toml
sed -i 's#"tcp://127.0.0.1:26657"#"tcp://0.0.0.0:26657"#g' ~/.passage/config/config.toml
sed -i "s/\"stake\"/\"$DENOM\"/g" ~/.passage/config/genesis.json
sed -i "s/\"max_gas\": \"-1\"/\"max_gas\": \"$BLOCK_GAS_LIMIT\"/" ~/.passage/config/genesis.json
sed -i 's/timeout_commit = "5s"/timeout_commit = "1s"/g' ~/.passage/config/config.toml
sed -i 's/timeout_propose = "3s"/timeout_propose = "1s"/g' ~/.passage/config/config.toml
sed -i 's/index_all_keys = false/index_all_keys = true/g' ~/.passage/config/config.toml
sed -i 's/laddr = "tcp://127.0.0.1:26657"/laddr = "tcp://0.0.0.0:26657"/g' ~/.passage/config/config.toml
sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["*"]/g' ~/.passage/config/config.toml

sed -i "s/iavl-cache-size = 781250/iavl-cache-size = $IAVL_CACHE_SIZE/g" ~/.passage/config/app.toml
sed -i "s/query_gas_limit = 50000000/query_gas_limit = $QUERY_GAS_LIMIT/g" ~/.passage/config/app.toml
sed -i "s/simulation_gas_limit = 25000000/simulation_gas_limit = $SIMULATION_GAS_LIMIT/g" ~/.passage/config/app.toml
sed -i "s/memory_cache_size = 512/memory_cache_size = $MEMORY_CACHE_SIZE/g" ~/.passage/config/app.toml
sed -i "s/enable = false/enable = true/g" ~/.passage/config/app.toml
sed -i "s/localhost:9090/0.0.0.0:9090/g" ~/.passage/config/app.toml
sed -i 's/^address = "tcp:\/\/localhost:1317"/address = "tcp:\/\/0.0.0.0:1317"/' ~/.passage/config/app.toml
sed -i 's/^enabled-unsafe-cors = false/enabled-unsafe-cors = true/' ~/.passage/config/app.toml


# Start the stake
passage start --pruning=nothing
