document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scriptForm');
    const resultDiv = document.getElementById('result');
    const scriptContent = document.getElementById('scriptContent');
    const loadingDiv = document.getElementById('loading');
    const copyBtn = document.getElementById('copyBtn');
    const newScriptBtn = document.getElementById('newScriptBtn');
    
    // Audience type selection handling
    const audiencePredefined = document.getElementById('audience_predefined');
    const audienceCustom = document.getElementById('audience_custom');
    const predefinedContainer = document.getElementById('predefined_audience_container');
    const customContainer = document.getElementById('custom_audience_container');
    
    audiencePredefined.addEventListener('change', function() {
        if (this.checked) {
            predefinedContainer.classList.remove('hidden');
            customContainer.classList.add('hidden');
        }
    });
    
    audienceCustom.addEventListener('change', function() {
        if (this.checked) {
            predefinedContainer.classList.add('hidden');
            customContainer.classList.remove('hidden');
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        loadingDiv.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        
        // Scroll to loading indicator
        loadingDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Get form data
        const formData = new FormData(form);
        
        // Determine which audience value to use
        const audienceType = formData.get('audience_type');
        if (audienceType === 'predefined') {
            formData.set('target_audience', formData.get('predefined_audience'));
        } else {
            formData.set('target_audience', formData.get('custom_audience'));
        }
        
        // Send request to backend
        fetch('/generate-script', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Hide loading, show result
            loadingDiv.classList.add('hidden');
            resultDiv.classList.remove('hidden');
            
            // Format script with special handling for visual directions in brackets
            let formattedScript = data.script
                .replace(/\n/g, '<br>')
                // Highlight visual directions in brackets
                .replace(/\[([^\]]+)\]/g, '<span class="visual-direction">[$1]</span>');
            
            // Display formatted script
            scriptContent.innerHTML = formattedScript;
            
            // Scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            loadingDiv.classList.add('hidden');
            alert('An error occurred while generating the script. Please try again.');
        });
    });
    
    // Copy to clipboard functionality
    copyBtn.addEventListener('click', function() {
        // Create a temporary element to strip HTML tags for clipboard
        const tempElement = document.createElement('div');
        tempElement.innerHTML = scriptContent.innerHTML;
        
        // Replace HTML breaks with newlines and remove other HTML tags
        const textToCopy = tempElement.innerText
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]*>/g, '');
            
        // Use the clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Show feedback
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span class="button-icon">✓</span> Copied!';
                
                // Reset button text after 2 seconds
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy to clipboard. Please try again.');
            });
    });
    
    // Create new script functionality
    newScriptBtn.addEventListener('click', function() {
        // Hide result, reset form
        resultDiv.classList.add('hidden');
        form.reset();
        
        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth' });
    });
});