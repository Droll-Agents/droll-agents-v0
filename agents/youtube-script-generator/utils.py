from llm_helper import llm

def process_script_request(video_type, video_topic=None, target_audience=None, key_messages=None, video_duration=None, video_tone=None, visual_themes=None, **kwargs):
    """
    Process the request to generate a YouTube video script
    
    Args:
        video_type (str): The type of video (Explainer, Tutorial, etc.)
        video_topic (str, optional): The topic of the video
        target_audience (str, optional): The target audience for the video
        key_messages (str, optional): Key messages to include in the video (one per line)
        video_duration (str, optional): The desired duration of the video
        video_tone (str, optional): The tone/style of the video (Casual, Professional, etc.)
        visual_themes (str, optional): Visual themes/elements to include in the video (one per line)
        **kwargs: Additional parameters to be added later
    
    Returns:
        str: Generated script
    """
    # Build a detailed prompt including all provided information
    prompt_parts = [f"Generate a script outline for a {video_type} YouTube video"]
    
    if video_topic:
        prompt_parts.append(f"about '{video_topic}'")
    
    if target_audience:
        prompt_parts.append(f"targeted at {target_audience}")
        
    if video_duration:
        prompt_parts.append(f"with a duration of approximately {video_duration}")
        
    if video_tone:
        prompt_parts.append(f"in a {video_tone} tone")
    
    prompt = " ".join(prompt_parts) + "."
    
    # Process key messages if provided
    if key_messages and key_messages.strip():
        # Split by new lines and remove empty lines
        message_list = [msg.strip() for msg in key_messages.split('\n') if msg.strip()]
        
        if message_list:
            prompt += "\n\nMake sure to include these key messages in the script:"
            for i, message in enumerate(message_list, 1):
                prompt += f"\n{i}. {message}"
    
    # Process visual themes if provided
    if visual_themes and visual_themes.strip():
        # Split by new lines and remove empty lines
        theme_list = [theme.strip() for theme in visual_themes.split('\n') if theme.strip()]
        
        if theme_list:
            prompt += "\n\nIncorporate these visual elements and themes throughout the video:"
            for i, theme in enumerate(theme_list, 1):
                prompt += f"\n{i}. {theme}"
            
            prompt += "\n\nFor each section of the script, include specific visual directions in [brackets] that align with these themes."
    
    # Call the LLM
    response = llm.invoke(prompt)
    
    return response.content