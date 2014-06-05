
/***

You are given a non-empty zero-indexed array A consisting of N integers.

For each number A[i] such that 0 ≤ i < N, we want to count the number of elements of the array that are not the divisors of A[i]. We say that these elements are non-divisors.

For example, consider integer N = 5 and array A such that:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6

For the following elements:

        A[0] = 3, the non-divisors are: 2, 6,
        A[1] = 1, the non-divisors are: 3, 2, 3, 6,
        A[2] = 2, the non-divisors are: 3, 3, 6,
        A[3] = 3, the non-divisors are: 2, 6,
        A[6] = 6, there aren't any non-divisors.

Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A consisting of N integers, returns a sequence of integers representing the amount of non-divisors.

The sequence should be returned as:

        a structure Results (in C), or
        a vector of integers (in C++), or
        a record Results (in Pascal), or
        an array of integers (in any other programming language).

For example, given:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6

the function should return [2, 4, 3, 2, 0], as explained above.

Assume that:

        N is an integer within the range [1..50,000];
        each element of array A is an integer within the range [1..2 * N].

Complexity:

        expected worst-case time complexity is O(N*log(N));
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

***/

function solution(A) {
    var longitud = A.length;
    var result = [];
    count ={};
    
    
    // In this loop we obtain the times a number apears in the array
    for(i=0; i<longitud;i++){
        result[i]=0;
        if(!count[A[i]]){
            count[A[i]]=1;
        }
        else{
            count[A[i]]+=1;
        }
    }


    for(i=0; i<longitud;i++){
        for(j=1; j*j<=A[i];j++){//here we record for the divisors of the element A[i] of the array
            if(A[i]%j===0){ // if j is divisor then we sum to the list of divisors
                var div = A[i]/j;
                if(count[j]){ // here we check for j 
                    result[i] +=count[j];
                }
                if(count[div] && div!==j){ // here we check for the other divisors
                    result[i] += count[div];
                }
            }
        }
   } 
   // and finally we rest the length of the element for the divisor of eachelement.
   for(i=0; i<longitud;i++){
       result[i]=longitud-result[i];
   }
    return result;
}

/**
function solution(A) {
    var longitud = A.length;
    var result = [];
    for(i=0; i<longitud;i++){
        result[i]=0;
        for(j=0;j<longitud;j++){
            if(i!==j){
                if( !(A[i]>=A[j] && (A[i]%A[j]===0))){
                    result[i]+=1;
                }
            }
        }
    }
    return result;
}**/
