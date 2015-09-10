import cPickle, gzip, numpy
from scipy.misc import imsave
import os

if not os.path.exists('../lib/digits'):
    os.makedirs('../lib/digits')

f = gzip.open('mnist.pkl.gz', 'rb')
train_set, valid_set, test_set = cPickle.load(f)
f.close()

print len(train_set[0])
print len(valid_set[0])
print len(test_set[0])

# convert both train and test to png as images
x = numpy.concatenate((train_set[0]*255,valid_set[0]*255,test_set[0][:3000,:]*255))
for i in range(20):
  imsave('../lib/digits/mnist_batch_'+`i`+'.png', x[3000*i:3000*(i+1),:])
imsave('../lib/digits/mnist_batch_'+`20`+'.png', x[60000:,:]) # test set

# dump the labels
L = `list(numpy.concatenate((train_set[1],valid_set[1],test_set[1])))`
open('../lib/digits/mnist_labels.json', 'w').write(L)

