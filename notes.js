// Workers. They give a programmer the ability to run some tasks in a different thread, so they can start the task, then continue with other processing (such as handling user actions).


// Listen for messages from the main thread.
// If the message command is "generate", call `generatePrimes()`
addEventListener("message", (message) => {
    if (message.data.command === "generate") {
      // Call the generatePrimes function with the specified quota.
      generatePrimes(message.data.quota);
    }
  });
  
  // Generate primes (very inefficiently)
  function generatePrimes(quota) {
    // Define a helper function to check if a number is prime.
    function isPrime(n) {
      for (let c = 2; c <= Math.sqrt(n); ++c) {
        if (n % c === 0) {
          return false;
        }
      }
      return true;
    }
  
    // Create an array to store prime numbers and set the maximum value for candidates.
    const primes = [];
    const maximum = 1000000;
  
    // Continue generating prime numbers until the desired quota is met.
    while (primes.length < quota) {
      // Generate a random candidate number within the defined maximum.
      const candidate = Math.floor(Math.random() * (maximum + 1));
      
      // Check if the candidate is a prime number, and if so, add it to the primes array.
      if (isPrime(candidate)) {
        primes.push(candidate);
      }
    }
  
    // When the generation is complete, send a message back to the main thread
    // with the number of prime numbers generated.
    postMessage(primes.length);
  }
  