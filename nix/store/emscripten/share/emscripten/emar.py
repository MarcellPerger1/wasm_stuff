#!/nix/store/wq6s8i407ic4qp1dvd5yhrnd0kflzh6x-python3-3.9.12/bin/python3
# Copyright 2016 The Emscripten Authors.  All rights reserved.
# Emscripten is available under two separate licenses, the MIT license and the
# University of Illinois/NCSA Open Source License.  Both these licenses can be
# found in the LICENSE file.

"""Wrapper scripte around `llvm-ar`.
"""

import sys
from tools import shared

cmd = [shared.LLVM_AR] + sys.argv[1:]
sys.exit(shared.run_process(cmd, stdin=sys.stdin, check=False).returncode)
