# mnist-data
MNIST data exposed for node.js and JSPM.

Purpose
---
Provide MNIST data to node.js and browser users. This library is supposed to work out of the box with [nervous](https://github.com/hourliert/nervous).

Install
---

`npm install hourliert/mnist-data` or `jspm install mnist-data=github:hourliert/mnist-data`

If you want to use it on browser without JSPM, you need to have a mock for `fs` and `path` node modules.
A standalone version is comming for browser soon.

Developers
---

This project uses a python script derivated from [this script](http://cs.stanford.edu/people/karpathy/convnetjs/demo/mnist_parse.zip) python to extract the original [mnist data](http://deeplearning.net/data/mnist/mnist.pkl.gz) as **PNG images**.
The modified python script is in this repo and available [here](https://raw.githubusercontent.com/hourliert/mnist-data/master/scripts/unpack_mnist.py).

The PNG images are not in the repo. You need to generate them before doing anything. In the project folder:
```
cd ./scripts
python unpack_mnist.py
```

The **PNG images** are generated in the folder `./lib/digits/`.

Once done, you can convert this **PNG images** to json with this command:

```npm run extract```

The json files are stored in the same folder than the **PNG images**.

After that, the `mnist-data` library uses the json files and export them.


