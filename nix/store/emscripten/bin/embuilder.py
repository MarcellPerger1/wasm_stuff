#! /nix/store/bcwyhqvik6jhcklib33v6kykdl4zp9d4-bash-5.1-p8/bin/bash -e
export NODE_PATH='/nix/store/spanvrf4ykq46kazclv4pc97lbp7a534-emscripten-node-modules-2.0.27/node_modules'
export EM_EXCLUSIVE_CACHE_ACCESS='1'
export PYTHON='/nix/store/wq6s8i407ic4qp1dvd5yhrnd0kflzh6x-python3-3.9.12/bin/python'
exec "/nix/store/8j627ky0xvw1hc2qdkypgvl23062rbkx-emscripten-2.0.27/share/emscripten/embuilder.py"  "$@"
