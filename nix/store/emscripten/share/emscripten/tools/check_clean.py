#!/nix/store/wq6s8i407ic4qp1dvd5yhrnd0kflzh6x-python3-3.9.12/bin/python3
# Copyright 2019 The Emscripten Authors.  All rights reserved.
# Emscripten is available under two separate licenses, the MIT license and the
# University of Illinois/NCSA Open Source License.  Both these licenses can be
# found in the LICENSE file.

"""Check for clean checkout.  This is run after tests during CI to ensure
we are not polluting the source checkout.
"""

import os
import subprocess
import sys


def main():
  print("Running 'git status --short'")
  print('')

  here = os.path.dirname(__file__)
  output = subprocess.check_output(['git', 'status', '--short'], cwd=here)
  output = output.decode('utf-8').strip()
  if not output:
    print('Tree is clean.')
    return 0

  print(output)
  print('\nCheckout is not clean.  See above for list of dirty/untracked files.')
  return 1


if __name__ == '__main__':
  sys.exit(main())
