# Diamond Storage Conflict Test

Idea behind this was to run a really simple simulation to see how likely storage conflicts were to arise from diamond storage

It works by generating 1M bytes32 hashes from running `keccak256` on random 100 character strings. Then finding the "minimum difference" between the closest two storage addresses in bits.

## Conclusion

`bytes32` storage space is HUGE! It is probabilistically unlikely that any diamond storage would ever conflict.

To put it in perspective, program that created 1M storage slots, the _closest_ two slots of the 1M had `1.07583655498272086 e+55 Gigabyte` difference.
