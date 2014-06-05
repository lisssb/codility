/**The prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

The semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

You are given two non-empty zero-indexed arrays P and Q, each consisting of M integers. These arrays represent queries about the number of semiprimes within specified ranges.

Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

For example, consider an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20

The number of semiprimes within each of these ranges is as follows:

        (1, 26) is 10,
        (4, 10) is 4,
        (16, 20) is 0.

Write a function:

    function solution(N, P, Q); 

that, given an integer N and two non-empty zero-indexed arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

For example, given an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20

the function should return the values [10, 4, 0], as explained above.

Assume that:

        N is an integer within the range [1..50,000];
        M is an integer within the range [1..30,000];
        each element of arrays P, Q is an integer within the range [1..N];
        P[i] ≤ Q[i].

Complexity:

        expected worst-case time complexity is O(N*log(log(N))+M);
        expected worst-case space complexity is O(N+M), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified
***/

function solution(N, P, Q) {
    var M = P.length;
    var primes = {};
    var prime_array = [];
    
    // this functions are used to get the first n prime numbers, we only look forward for the half of n, because the minimun first multiplicator is 2, so we are no going to need the others one
    for(i=2; i<Math.floor(N/2)+1;i++){
        primes[i]= true;
    }
    for(i=2; i*i<=N;i++){
        if(primes[i]){
            k=i*i;
            while(k<Math.floor(N/2)+1){
                if(k%i===0)
                primes[k]=false;
                k+=1;
            }
        }
    }
    for(i=2; i<Math.floor(N/2)+1;i++){
        if(primes[i]){
            prime_array.push(i);
        }
    }
    
    //here we are gooin to find the semiprimes
    var semi = [];
    var sem ={};
    for(i=0; i<prime_array.length;i++){
        for(j=0; j<prime_array.length;j++){
            aux = prime_array[i]*prime_array[j];
            if(aux<=N && !sem[aux]){
                semi.push(aux);
                sem[aux]=aux;
            }
        }
    }
    semi.sort(function(a,b){return a-b;});
    
    
    //here we count the number of elements
    var result = [];
    for(i=0; i<M ; i++){
        start = P[i];
        end = Q[i];
        result[i]=0;
        for(j=0; j<semi.length; j++){
            if((semi[j]>=start) && (semi[j]<=end)){
                    result[i]+=1;
            }
        }
    }
    return result;
    
}

